import { Product } from "./models/product.js";
import { Section } from "./models/section.js";
import { User } from "./models/user.js";
import { Trainee } from "./models/trainee.js";
import { Lecture } from "./models/lecture.js";
import { Course } from "./models/course.js";
import { Service } from "./models/service.js";
import { Iterable } from "./models/iterable.js";
import cloudinary from "cloudinary";

function getUnique(value, index, array) {
  return self.indexOf(value) === index;
}

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
}

cloudinary.v2.config({
  cloud_name: "dxjhcfinq",
  api_key: "292858742431259",
  api_secret: "os1QzAVfEfifsaRgMvsXEfXlPws",
});

const isFile = (value) => {
  return false;
};

const resolvers = {
  Course: {
    lectures: async (parent, args, context, info) => {
      const lectures = await Lecture.find({
        course: parent?.id,
        removed: false,
      });
      return lectures;
    },
  },
  Trainee: {
    registeredCourses: async (parent, args, context, info) => {
      let courses = [];

      for (let _course of parent?.registeredCourses) {
        let course = {
          id: _course._id,
          course: await Course.findById(_course?.course),
          completed: _course?.completed,
          progress: _course?.progress,
          completionDate: _course?.completionDate,
        };
        courses.push(course);
      }

      return courses;
    },
  },
  Query: {
    getServices: async () => {
      let services = await Service.find();
      return services;
    },
    getCatsNSubcats: async (_, args) => {
      const products = await Product.find({ removed: false });

      function generateCategoryArray(objects) {
        const categoriesMap = new Map();

        for (const obj of objects) {
          const { category, subCategory } = obj;

          if (categoriesMap.has(category)) {
            const categoryObj = categoriesMap.get(category);
            categoryObj.subcategories.add(subCategory);
          } else {
            const subcategoriesSet = new Set();
            subcategoriesSet.add(subCategory);
            categoriesMap.set(category, {
              label: category,
              subcategories: subcategoriesSet,
            });
          }
        }

        const result = Array.from(
          categoriesMap.values(),
          ({ label, subcategories }) => ({
            label,
            subcategories: Array.from(subcategories),
          })
        );

        return result;
      }

      const output = generateCategoryArray(products);
      return output;
    },
    getSections: async (_, { page }) => {
      const sections = await Section.find({ page });
      return sections;
    },
    getIterables: async () => {
      const iterables = await Iterable.find();
      return iterables;
    },
    getProducts: async (_, args) => {
      const products = await Product.find({ removed: false });
      return products;
    },
    getProduct: async (_, args) => {
      const product = await Product.findById(args.id);
      return product;
    },
    getFeatured: async (_, args) => {
      const products = await Product.find({ featured: true });
      return products;
    },
    getUsers: async (_, args) => {
      const users = await User.find();
      return users;
    },
    getCourses: async (_, args) => {
      const courses = await Course.find().populate("addedBy");
      return courses;
    },
    getTrainee: async (_, { id }) => {
      const trainee = await Trainee.findById(id);
      return trainee;
    },
    getTrainees: async (_, args) => {
      const trainees = await Trainee.find();
      return trainees;
    },
    getUser: async (_, args) => {
      const { email, password, id } = args;

      let user;

      if (!id) {
        user = await User.findOne({ email, password });
      } else if (id) {
        user = await User.findById(id);
      }

      return user;
    },
  },

  Mutation: {
    updateTrainee: async (_, args) => {
      const { id, course, progress, completed, password, completionDate } =
        args;

      if (password) {
        await Trainee.updateOne(
          { _id: id },
          omit(args, ["id", "course", "progress", "completed"])
        );
      }

      if (course && progress) {
        await Trainee.updateOne(
          {
            _id: id,
            registeredCourses: { $elemMatch: { course } },
          },
          {
            $set: { "registeredCourses.$.progress": progress },
          }
        );
      }

      if (course && progress && completed) {
        await Trainee.updateOne(
          {
            _id: id,
            registeredCourses: { $elemMatch: { course } },
          },
          {
            $set: {
              "registeredCourses.$.completed": completed,
              "registeredCourses.$.progress": progress,
              "registeredCourses.$.completionDate": completionDate,
            },
          }
        );
      }

      let trainee = await Trainee.findById(id);
      return trainee;
    },
    addCourse: async (_, args) => {
      console.log(args);

      const {
        name,
        addedBy,
        price,
        description,
        image,
        category,
        onSale,
        was,
        featured,
      } = args;

      let res = await cloudinary.v2.uploader.upload(image, {
        public_id: "",
        folder: "courses",
      });

      let newCourse = new Course({
        name,
        addedBy,
        price,
        description,
        category,
        onSale: onSale ? onSale : false,
        was,
        image: res?.url,
        featured,
      });

      let course = newCourse.save();
      return course;
    },
    updateLecture: async (_, args) => {
      console.log(omit(args, ["id"]));

      await Lecture.updateOne({ _id: args.id }, omit(args, ["id"]));

      let lecture = await Lecture.findById(args.id);
      return lecture;
    },
    enrollCourse: async (_, args) => {
      const { trainee, course } = args;

      await Trainee.updateOne(
        { _id: trainee },
        {
          $addToSet: {
            registeredCourses: { course, completed: false, progress: 0 },
          },
        }
      );

      let _trainee = await Trainee.findById(trainee);
      return _trainee;
    },
    addLecture: async (_, args) => {
      const { description, content, title, quiz, course, timeEstimate } = args;

      const newLecture = new Lecture({
        quiz: JSON.parse(quiz),
        description,
        content,
        title,
        course,
        timeEstimate,
        removed: false,
      });

      const lecture = newLecture.save();
      return lecture;
    },
    addTrainee: async (_, args) => {
      const { email, fullName, password } = args;

      let newTrainee = new Trainee({
        email,
        fullName,
        password,
      });

      let trainee = newTrainee.save();
      return trainee;
    },
    addSection: async (_, { page, value, identifier }) => {
      if (isFile(value)) {
        let res = await cloudinary.v2.uploader.upload(value, {
          public_id: "",
          folder: "sections",
        });
        const newSection = new Section({
          page,
          value: res.url,
          identifier,
        });

        const section = newSection.save();
        return section;
      } else {
        const newSection = new Section({
          page,
          value,
          identifier,
        });

        const section = newSection.save();
        return section;
      }
    },
    addUser: async (_, args) => {
      const { firstName, lastName, email, userLevelAccess } = args;

      let newUser;

      switch (userLevelAccess) {
        case "super-admin":
          newUser = new User({
            firstName,
            lastName,
            email,
            password: "serenepsl",
            canModifyUsers: true,
            canModifyContent: true,
            canModifySections: true,
            canModifyProducts: true,
          });
          break;

        case "content-manager":
          newUser = new User({
            firstName,
            lastName,
            email,
            password: "serenepsl",
            canModifyUsers: false,
            canModifyContent: true,
            canModifySections: false,
            canModifyProducts: true,
          });
          break;

        default:
          newUser = new User({
            firstName,
            lastName,
            email,
            password: "serenepsl",
            canModifyUsers: false,
            canModifyContent: false,
            canModifySections: false,
            canModifyProducts: false,
          });
          break;
      }

      let user = newUser.save();
      return user;
    },

    deleteUser: async (_, { email }) => {
      const user = await User.findOneAndDelete({
        email,
      });

      return user;
    },
    addService: async (_, args) => {
      const { title, description, image, mini } = args;
      let res1 = await cloudinary.v2.uploader.upload(image, {
        public_id: "",
        folder: "services",
      });

      const newService = new Service({
        title,
        description,
        image: res1?.url,
        mini,
      });

      let service = newService.save();

      console.log(service);

      return service;
    },
    deleteService: async (_, { id }) => {
      const deleted = await Service.findByIdAndDelete(id);
      return deleted;
    },
    addProduct: async (_, args) => {
      const {
        category,
        subCategory,
        name,
        image,
        specSheet,
        description,
        featured,
        price,
      } = args;

      let res1 = await cloudinary.v2.uploader.upload(image, {
        public_id: "",
        folder: "products",
      });

      let res2 = await cloudinary.v2.uploader.upload(specSheet, {
        public_id: "",
        folder: "specSheets",
      });

      console.log(res1.url, res2.url);

      const newProduct = new Product({
        category,
        subCategory,
        name,
        image: res1.url,
        specSheet: res2.url,
        description,
        removed: false,
        featured,
        price,
      });

      let product = newProduct.save();
      return product;
    },
    updateSection: async (_, { identifier, value, isImage }) => {
      if (isImage) {
        res1 = await cloudinary.v2.uploader.upload(value, {
          public_id: "",
          folder: "sliders",
        });

        const newSection = new Section({
          identifier,
          value: res1,
        });

        const section = newSection.save();
        return section;
      }
      const section = await Section.findOneAndUpdate(
        { identifier },
        { $set: { value } },
        { upsert: true, new: true }
      );
      return section;
    },
    updateProduct: async (_, args) => {
      console.log(omit(args, ["id", "image", "specSheet"]));

      let res1, res2;

      if (args?.image) {
        res1 = await cloudinary.v2.uploader.upload(args?.image, {
          public_id: "",
          folder: "products",
        });
      }

      if (args?.specSheet) {
        res2 = await cloudinary.v2.uploader.upload(args?.specSheet, {
          public_id: "",
          folder: "specSheets",
        });
      }

      let update;

      if (res1 && !res2) {
        update = {
          ...omit(args, ["id", "image", "specSheet"]),
          image: res1,
        };
      } else if (!res1 && res2) {
        update = {
          ...omit(args, ["id", "image", "specSheet"]),
          specSheet: res2,
        };
      } else if (res1 && res2) {
        update = {
          ...omit(args, ["id", "image", "specSheet"]),
          specSheet: res2,
          image: res1,
        };
      } else {
        update = omit(args, ["id", "image", "specSheet"]);
      }

      await Product.updateOne({ _id: args.id }, update);

      let product = await Product.findById(args.id);
      return product;
    },
    updateUser: async (_, args) => {
      await User.updateOne({ email: args.email }, omit(args, ["email"]));
      let user = await User.findOne({ email: args.email });
      return user;
    },

    upsertSection: async (_, { value, identifier }) => {
      let section = await Section.findOneAndUpdate(
        {
          identifier,
        },
        {
          value,
        },
        {
          upsert: true,
        }
      );

      return section;
    },
    upsertIterable: async (_, { value, identifier, action, extra }) => {
      let section;

      console.log({ value, identifier, action, extra });

      if (action == "upsert") {
        section = await Iterable.findOneAndUpdate(
          {
            identifier,
            extra,
          },
          {
            $addToSet: {
              value,
            },
          },
          {
            upsert: true,
          }
        );
      } else if (
        action == "delete" &&
        (identifier == "clients" ||
          identifier == "partners" ||
          identifier == "slides")
      ) {
        section = await Iterable.findOneAndUpdate(
          {
            identifier,
          },
          { $pull: { value } },
          { new: true }
        );
      } else if (action == "delete" && identifier == "testimonials") {
        section = await Iterable.findOneAndDelete({
          identifier: "testimonials",
          value,
        });
      }

      return section;
    },
  },
};

export default resolvers;
