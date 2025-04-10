CREATE TYPE public."UserType" AS ENUM ('User', 'Admin');

CREATE TABLE IF NOT EXISTS public."User" (
    id serial NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    created timestamp with time zone NOT NULL,
    active boolean NOT NULL DEFAULT true,
    type "UserType" NOT NULL DEFAULT 'User',
    PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS name_index ON public."User" (name);