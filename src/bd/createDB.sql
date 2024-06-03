CREATE TYPE SESSION_TYPE AS ENUM('RACE', 'PRACTICE', 'SPRINT', 'QUALIFY', 'HISTORIC')

CREATE TABLE "drivers" (
  "driver_key" integer PRIMARY KEY,
  "country_code" varchar(3) NOT NULL,
  "driver_number" integer NOT NULL,
  "full_name" varchar(50) NOT NULL,
  "name_acronym" varchar(3) NOT NULL,
  "session_key" integer NOT NULL,
  "team_colour" varchar NOT NULL,
  "team_name" varchar NOT NULL
);

CREATE TABLE "intervals" (
  "id" integer PRIMARY KEY,
  "date" date NOT NULL,
  "driver_key" integer NOT NULL,
  "gap_to_leader" timestamp NOT NULL,
  "interval" integer NOT NULL,
  "session_key" integer NOT NULL
);

CREATE TABLE "pit_stop" (
  "id" integer PRIMARY KEY,
  "date" date NOT NULL,
  "driver_key" integer NOT NULL,
  "lap_number" integer NOT NULL,
  "pit_duration" integer NOT NULL,
  "session_key" integer NOT NULL
);

CREATE TABLE "position" (
  "id" integer PRIMARY KEY,
  "date" date NOT NULL,
  "driver_key" integer NOT NULL,
  "position" integer NOT NULL,
  "session_key" integer NOT NULL
);

CREATE TABLE "sessions" (
  "session_key" integer NOT NULL PRIMARY KEY,
  "session_name" integer NOT NULL,
  "session_type" varchar NOT NULL,
  "circuit_short_name" varchar NOT NULL,
  "country_key" integer NOT NULL,
  "country_name" varchar NOT NULL,
  "date_end" time,
  "date_start" time NOT NULL,
  "gmt_offset" timestamp NOT NULL,
  "location" varchar NOT NULL,
  "year" int NOT NULL
);

CREATE TABLE "radio" (
  "id" integer PRIMARY KEY,
  "date" date NOT NULL,
  "driver_key" integer NOT NULL,
  "recording_url" text NOT NULL,
  "session_key" integer NOT NULL
);

CREATE TABLE "weather" (
  "id" integer PRIMARY KEY,
  "date" date NOT NULL,
  "session_key" integer NOT NULL,
  "humidity" integer NOT NULL,
  "rainfall" integer NOT NULL,
  "track_temperature" numeric NOT NULL,
  "wind_speed" numeric NOT NULL
);

ALTER TABLE "drivers" ADD FOREIGN KEY ("session_key") REFERENCES "sessions" ("session_key");

ALTER TABLE "pit_stop" ADD FOREIGN KEY ("driver_key") REFERENCES "drivers" ("driver_key");

ALTER TABLE "pit_stop" ADD FOREIGN KEY ("session_key") REFERENCES "sessions" ("session_key");

ALTER TABLE "radio" ADD FOREIGN KEY ("driver_key") REFERENCES "drivers" ("driver_key");

ALTER TABLE "radio" ADD FOREIGN KEY ("session_key") REFERENCES "sessions" ("session_key");

ALTER TABLE "weather" ADD FOREIGN KEY ("session_key") REFERENCES "sessions" ("session_key");

ALTER TABLE "position" ADD FOREIGN KEY ("driver_key") REFERENCES "drivers" ("driver_key");

ALTER TABLE "position" ADD FOREIGN KEY ("session_key") REFERENCES "sessions" ("session_key");

ALTER TABLE "intervals" ADD FOREIGN KEY ("driver_key") REFERENCES "drivers" ("driver_key");

ALTER TABLE "intervals" ADD FOREIGN KEY ("session_key") REFERENCES "sessions" ("session_key");
