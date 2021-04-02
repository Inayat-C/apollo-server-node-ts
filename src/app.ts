import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

import { routes } from './routes';
import { CreateError } from '@util/CreateError';

const app: Application = express();

/**
 * Set content security policy to false when not in a production environemnt.
 * default value of undefined causes GraphQL Playground to not load.
 * https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
 */
app.use(
    helmet({
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }),
);

// Parses incoming JSON requests
app.use(express.json());

// Connect all the routes in our application
app.use('/', routes);

// Catch our errors
app.use((err: CreateError, _req: Request, res: Response, _nxt: NextFunction) => {
    const { stack, message } = err;

    if (err instanceof CreateError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json({
        default: 'Internal Server Error, something went wrong',
        message,
        stack,
    });
});

export { app };
