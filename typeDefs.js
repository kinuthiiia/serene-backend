const typeDefs = `
type Course {
    id: ID!
    name: String
    createdAt: String
    description: String
    addedBy: Admin
    image: String
    was: Int
    category: String
    price: Int
    onSale: Boolean
    payableAt: Int
    lectures: [Lecture]
    registeredUsers: [User]
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

type User {
    id : ID!
    email: String
    name: String
    image: String   
    registeredCourses: [RegisteredCourse]    
}



type RegisteredCourse {
    id: ID
    course: Course
    completed: Boolean
    progress: Float
    completionDate: String
    code: String
    amount: Int
    timestamp: String
    phoneNumber: String
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

type Admin{
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

type Iterable {
    id: ID!
    value: [String]
    identifier: String
    extra: String
}

type CatsNSubcats {
    label: String
    subcategories: [String]
}

type Query { 
   getSections : [Section] 
   getIterables : [Iterable] 
   getProducts: [Product]
   getProduct(id:ID!) : Product
   getFeatured: [Product]
   getAdmins: [Admin]
   getAdmin(email: String, password: String , id: ID) : Admin
   getCourses: [Course]
   getUser(email: String): User
   getUsers: [User]
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

    upsertSection( value: String , identifier: String) : Section

    addLecture(   
        description: String
        content: String
        title: String
        quiz: String
        timeEstimate: Int
        course: ID
    ): Lecture

    updateUser(
        id: ID!
        course: ID
        progress: Float
        completed: Boolean
        password: String
        completionDate: String
        code: String
        amount : Int
        timestamp: String
        phoneNumber: String
    ): User

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
        payableAt: Int
    ): Course

    addUser(
        email: String
        name: String        
    ): User

    enrollCourse(
        trainee: ID
        course: ID        
    ): User

    addAdmin(    
        firstName: String   
        lastName: String
        email: String     
        userLevelAccess: String
    ): Admin

    deleteAdmin(
        email: String
    ) : Admin

    updateAdmin(    
       email: String
        firstName: String   
        lastName: String
        phoneNumber: String     
        password: String
        canModifyUsers: Boolean
        canModifyContent: Boolean
        canModifySections: Boolean
        canModifyProducts: Boolean
    ): Admin

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
        price: Int
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

    upsertIterable(
        identifier: String
        value: String
        action: String
        extra: String
    ): Iterable
}

`;

export default typeDefs;
