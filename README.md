## nook editor

nook-editor is an editor for registering articles on your supabase.

## Usage

**You need to create a project with supabase and reserve the API KEY and url.**

Create an .env file under the project and describe the API KEY and url.

[Quickstart: React](https://supabase.io/docs/guides/with-react)

```
//.env

REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANNO_KEY
```

```bash
yarn install

and

yarn start
```

Runs the app in development mode.

Open http://localhost:3000 to view it in the browser.

### Authentication

nook used in authentication Email & password.

[Supabase Auth](https://supabase.io/docs/guides/auth/intro)

### Database

**profiles**

|     | type |
| --- | ---- |
| id  | uuid |

profiles id is User UID.

**Articles**

|            | type        | Nullable | Unique |
| ---------- | ----------- | -------- | ------ |
| id         | int8        |          |        |
| slug       | uuid        |          | ◯      |
| title      | text        |          |        |
| word       | text        | ◯        |        |
| content    | json        | ◯        |        |
| ispublish  | boolean     | ◯        |        |
| created_at | timestamptz | ◯        |        |
| updated_at | timestamptz | ◯        |        |
| user_id    | uuid        |          |        |
| categories | int8[]      | ◯        |        |

**Categories**

|             | type        | Nullable | Unique |
| ----------- | ----------- | -------- | ------ |
| id          | int8        |          |        |
| name        | text        |          |        |
| description | text        |          |        |
| created_at  | timestamptz | ◯        |        |
| updated_at  | timestamptz | ◯        |        |
| user_id     | uuid        |          |        |
| image_url   | text        | ◯        |        |
