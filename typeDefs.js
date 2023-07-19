const typeDefs = `
type Course {
    id: ID!
    name: String
    createdAt: String
    description: String
    addedBy: User    
    image: String
    was: Int
    category: String
    price: Int
    onSale: Boolean
    lectures: [Lecture]
}


type Service {
    id: ID!
    title: String
    description: String
    image: String
    mini: Boolean

}

type Lecture{
    id: ID!
    title: String
    content: String  
    description: String
    timeEstimate: Int
    quiz: [Question]  
    removed: Boolean
}

type Question {
    question: String
    options: [String]
    answer: Int
}

type Trainee {
    id : ID!
    email: String
    fullName: String
    image: String
    password: String
    registeredCourses: [RegisteredCourse]
}

type RegisteredCourse {
    id: ID
    course: Course
    completed: Boolean
    progress: Float
}


type Product {
    id: ID!
    category: String
    subCategory: String
    name: String
    image: String
    specSheet: String    
    description: String
    removed: Boolean
    featured: Boolean
    price: Int
}

type User{
    id: ID!
    image: String   
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    password: String
    canModifyUsers: Boolean
    canModifyContent: Boolean
    canModifySections: Boolean
    canModifyProducts: Boolean
}

type Section {
    id: ID!
    value: String
    identifier: String
}

type CatsNSubcats {
    label: String
    subcategories: [String]
}

type Query { 
   getSections : [Section] 
   getProducts: [Product]
   getProduct(id:ID!) : Product
   getFeatured: [Product]
   getUsers: [User]
   getUser(email: String, password: String , id: ID) : User
   getCourses: [Course]
   getTrainee(id: ID): Trainee
   getTrainees: [Trainee]
   getCatsNSubcats: [CatsNSubcats]
  
   getServices: [Service]
}

type Mutation {
    addService(
        title: String
        description: String
        image: String
        mini: Boolean
    ): Service

    deleteService(id: ID) : Service

    addLecture(   
        description: String
        content: String
        title: String
        quiz: String
        timeEstimate: Int
        course: ID
    ): Lecture

    updateTrainee(
        id: ID!
        course: ID
        progress: Float
        completed: Boolean
        password: String
    ): Trainee

   updateLecture(
        id: ID
        title:String
        quiz: String
        content: String
        description: String
        timeEstimate: Int
        removed: Boolean
      ): Lecture

    addCourse(
        name: String
        addedBy: ID
        price: Int
        description: String
        image: String
        category: String
        onSale: Boolean
        featured: Boolean
        was: Int
    ): Course

    addTrainee(
        email: String
        fullName: String
        password: String
    ): Trainee

    enrollCourse(
        trainee: ID
        course: ID        
    ): Trainee

    addUser(    
        firstName: String   
        lastName: String
        email: String     
        userLevelAccess: String
    ): User

    updateUser(
       email: String
        firstName: String   
        lastName: String
        phoneNumber: String     
        password: String
    ): User

   addSection(
        page: ID
        value: String
        identifier: String        
    ) : Section

    addProduct(
        category: String
        subCategory: String
        name: String
        image: String
        specSheet: String
        description: String
        featured: Boolean
        price: Float
    ) : Product

    updateSection(
        identifier: String
        value: String
        isImage: Boolean
    ) : Section

    updateProduct(
        id: ID!
        removed: Boolean
        name: String
        category: String
        subCategory: String
        description: String
        image: String
        specSheet: String
        featured: Boolean
        price: Int
    ): Product
}

`;

export default typeDefs;
