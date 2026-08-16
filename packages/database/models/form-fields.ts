
import { boolean, pgEnum, pgTable , text, timestamp, uuid , varchar , numeric} from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export const fieldTypeEnum = pgEnum( "field_type_enum", [
    "TEXT",
    "NUMBER",
    "EMAIL",
    "YES_NO",
    "PASSWORD"
])

export const formFieldsTable = pgTable("form_fields",{
        id: uuid("id").primaryKey().defaultRandom(),

        formId: uuid("form_id").references(() =>formsTable.id ),

        label:varchar("label", {length: 50}).notNull(),
        labelKey: varchar("label_key", {length: 50}).notNull(),

        description: text("description"),

        placeholder : text("placeholder"),
        isRequired: boolean("is_required").default(false).notNull(),

        index: numeric("index").notNull(),
        type: fieldTypeEnum("type").notNull(),

    
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").$onUpdate(()=> new Date()).defaultNow()
})