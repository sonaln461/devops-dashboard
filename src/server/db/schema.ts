import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `devops-dashboard_${name}`);

export const projects = createTable(
  "projects",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 255 }).notNull().unique(),
  }
);

export const deployments = createTable(
  "deployments", 
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    project: varchar("project", { length: 255 }).notNull(),
    environment: varchar("environment", { length: 255 }).notNull(),
    version: varchar("version", { length: 255 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    riskScore: integer("risk_score"),
  }
);