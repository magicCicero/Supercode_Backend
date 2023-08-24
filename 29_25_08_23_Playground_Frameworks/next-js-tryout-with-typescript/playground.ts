let students = ["Grace", "Bernd"];
let grades = [1, 4];

type Name = string;
type Grade = number | string;
type TStudent = {
  name: Name;
  grade: Grade;
};

interface IStudent {
  name: Name;
  grade: Grade;
}

let studentsObjArr: TStudent[] = [{ name: "Grace", grade: 1 }];

studentsObjArr.push({ name: "Bernd", grade: "F" });

const genius = "grace";

type TUser = {
  firstName: string;
  lastName: string;
};

type Admin = {
  admin: true;
};

type AdminUser = Admin & TUser;

const admin: AdminUser = {
  admin: true,
  firstName: "Bernd",
  lastName: "Berndson",
};

interface IUser {
  firstName: string;
  lastName: string;
}

const user: TUser = {
  firstName: "Grace",
  lastName: "Hopper",
};

const user2: TUser = { firstName: "Oliver", lastName: "Weber" };

type Cat = {
  furetype: string;
};
type Dog = {
  legs: number;
};

type CatDog = Dog & Cat;
const myCatDog: CatDog = {
  furetype: "long",
  legs: 4,
};

const add = (a: unknown, b: unknown) => {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }

  return;
};

const hello = add("Hello ", "Bernd");

function useState(val: string): [string, () => void] {
  const setValFN = () => {};
  return [val, setValFN];
}

const state = useState("Hello");

// Type Assertions mit `as`

type Bird = {
  wings: true;
  sound: string;
};

type Animal = {
  alive: string;
};

function dothings(animal: Animal | Bird) {
  if ("wings" in animal) {
    animal;
  }
}

const myPet: Bird = {
  sound: "Gagah",
  wings: true,
};

dothings(myPet as unknown as Animal);

function useStateWithAsser(val: string) {
  const setValFN = () => {};
  return [val, setValFN] as const;
}

const state2 = useStateWithAsser("Hello");

const env = {
  DB: "//mongo",
  URL: "//somedomain.com",
  PORT: 3000,
} as const;

// Generische Typen
// Parameter für Typen / Typen Funktionen
function useStateGeneric<T>(val: T) {
  const setValFN = (lastState: T) => {};

  return [val, setValFN] as const;
}
let usererers: TUser[];
let usersers2: Array<TUser>;

const [state3, setState] = useStateGeneric(3);

const [users, setUsers] = useStateGeneric<TUser[] | null>(null);

users && users.map((ele, i) => ele.firstName);

type User<T> = {
  firstName: string;
  lastName: string;
  specialFeature: T;
};
