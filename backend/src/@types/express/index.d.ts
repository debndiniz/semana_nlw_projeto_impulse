declare namespace Express { // biblioteca que quero sobrescrever
  export interface Request { //qual a interface ode quero colocar essa informacao . tudo dentro de request + userid
    user_id: string;
  }
}