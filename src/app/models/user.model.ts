export class User {

  static fromFirebase({email, uid, nombre}) {
    return new User(uid, nombre, email);
  }

  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {
  }

}
