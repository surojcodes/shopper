import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

interface IErrorDetails {
  location: string;
  issue: string;
}

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const zodIssues = error.issues;

    console.log(zodIssues);

    let issues: IErrorDetails[] = [];
    for (let zIssue of zodIssues) {
      // issues.push(`Location:${zIssue.path[1]}, Issue:${zIssue.message}`);
      let location = zIssue.path[0].toString();
      let issue = zIssue.message;
      if (zIssue.code === 'invalid_type')
        location += '=>' + zIssue.path[1].toString();
      else if (zIssue.code === 'unrecognized_keys') {
        location += '=>' + zIssue.keys[0].toString();
        issue = zIssue.keys[0].toString() + ' is not allowed to be updated.';
      }
      issues.push({
        location,
        issue,
      });
    }
    return res.status(400).json({
      success: false,
      issue: issues,
    });
  }
  //Duplicate stuff
  if (error.code && error.code === 11000) {
    console.log(error);
    const location = Object.keys(error.keyPattern);
    const issue = `Duplicate value for ${location}`;
    return res.status(400).json({
      success: false,
      issue: [
        {
          location,
          issue,
        },
      ],
    });
  }

  console.log('In custom error handler', error);
  res.status(500).json({
    success: false,
    issue: 'Internal Server Error',
  });
};

export default errorHandler;
