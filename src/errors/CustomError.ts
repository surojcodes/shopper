export class CustomError extends Error {
  public statusCode: number = 500;
  public location: string = 'Shopper App';
  constructor(msg: string) {
    super(msg);
  }
}

export class NotFoundError extends CustomError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 404;
    this.location = location;
  }
}
export class BadRequestError extends CustomError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 400;
    this.location = location;
  }
}
export class UnAuthorizedError extends CustomError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 401;
    this.location = location;
  }
}

export class UnAuthenticatedError extends CustomError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 403;
    this.location = location;
  }
}
