import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Inserting data into the database
async function insertUser(
  email: string,
  username: string,
  password: string,
  fullname: string
) {
  const res = await prisma.user.create({
    data: {
      email,
      username,
      password,
      fullname,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      fullname: true,
    },
  });
  console.log(res);
}

// Updating data in the database

async function updateUser(
  id: number,
  email: string,
  username: string,
  password: string,
  fullname: string
) {
  const res = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      username,
      password,
      fullname,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      fullname: true,
    },
  });
  console.log(res);
}

// Getting data from the database

async function getUser(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  console.log(user);
}
getUser("AmanOG");

insertUser("jaman5763@gmail.com", "Aman", "123456", "Aman Jaiswal")

updateUser(2, "jaman@gmail.com", "AmanOG", "123456", "Aman Jaiswal")

// Relationship

async function createTodo(user_id: number, title: string, description: string) {
  const todo = await prisma.todos.create({
    data: {
      title,
      description,
      user_id,
    },
  });
  console.log(todo);
}

createTodo(1, "go to gym", "go to gym and do 10 pushups");

async function getTodos(user_id: number) {
  const todos = await prisma.todos.findMany({
    where: {
      user_id: user_id,
    },
  });
  console.log(todos);
}

getTodos(1);

// one way to do this is to get user details and then get todos of that user

async function getTodosAndUserDetails(user_Id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: user_Id
        }
    });
    const todos = await prisma.todos.findMany({
        where: {
            user_id: user_Id,
        }
    });
    console.log(todos);
    console.log(user)
}

getTodosAndUserDetails(1);

// better way to do this using joins

async function getTodosAndUserDetailss(user_id: number, ) {
    const todos = await prisma.todos.findMany({
        where: {
            id: user_id,
        },
        select: {
            user: true,
            title: true,
            description: true
        }
    });
    console.log(todos);
}

getTodosAndUserDetailss(1);

