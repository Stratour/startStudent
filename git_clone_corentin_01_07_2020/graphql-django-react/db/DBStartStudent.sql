-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.1-beta
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.com.br
-- Model Author: ---


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: "DBStartStudent" | type: DATABASE --
-- -- DROP DATABASE IF EXISTS "DBStartStudent";
-- CREATE DATABASE "DBStartStudent"
-- ;
-- -- ddl-end --
-- 

-- object: public.sch_entity | type: TABLE --
-- DROP TABLE IF EXISTS public.sch_entity CASCADE;
CREATE TABLE public.sch_entity(
	sch_ent_pk integer NOT NULL,
	sch_ent_name varchar,
	sch_ent_street varchar,
	sch_ent_num_street integer,
	"sch_ent_postCode" integer,
	sch_ent_city varchar,
	sch_ent_department varchar,
	sch_ent_country varchar,
	CONSTRAINT sch_entity_1 PRIMARY KEY (sch_ent_pk)

);
-- ddl-end --
ALTER TABLE public.sch_entity OWNER TO postgres;
-- ddl-end --

-- object: public.sch_site | type: TABLE --
-- DROP TABLE IF EXISTS public.sch_site CASCADE;
CREATE TABLE public.sch_site(
	sch_sit_pk integer NOT NULL,
	sch_sit_name varchar,
	sch_ent_street varchar,
	sch_sit_num_street integer,
	"sch_sit_postCode" integer,
	sch_sit_city varchar,
	sch_sit_department varchar,
	sch_sit_country varchar,
	sch_sit_entity integer,
	CONSTRAINT sch_sit_1 PRIMARY KEY (sch_sit_pk)

);
-- ddl-end --
ALTER TABLE public.sch_site OWNER TO postgres;
-- ddl-end --

-- object: public.crs_department | type: TABLE --
-- DROP TABLE IF EXISTS public.crs_department CASCADE;
CREATE TABLE public.crs_department(
	crs_dpt_pk integer NOT NULL,
	crs_dpt_name varchar,
	crs_dpt_descriptiion varchar,
	crs_dpt_fk integer,
	CONSTRAINT crs_dpt_pk PRIMARY KEY (crs_dpt_pk)

);
-- ddl-end --
ALTER TABLE public.crs_department OWNER TO postgres;
-- ddl-end --

-- object: public.crs_section | type: TABLE --
-- DROP TABLE IF EXISTS public.crs_section CASCADE;
CREATE TABLE public.crs_section(
	crs_sct_pk integer,
	crs_sct_name varchar,
	crs_sct_subname varchar,
	crs_sct_codification varchar,
	crs_sct_dept_fk integer
);
-- ddl-end --
ALTER TABLE public.crs_section OWNER TO postgres;
-- ddl-end --

-- object: public.crs_degree | type: TABLE --
-- DROP TABLE IF EXISTS public.crs_degree CASCADE;
CREATE TABLE public.crs_degree(
	crs_deg_pk integer,
	crs_deg_name varchar,
	crs_deg_fk integer
);
-- ddl-end --
ALTER TABLE public.crs_degree OWNER TO postgres;
-- ddl-end --

-- object: public.crs_school_year | type: TABLE --
-- DROP TABLE IF EXISTS public.crs_school_year CASCADE;
CREATE TABLE public.crs_school_year(
	crs_sch_year_pk integer,
	crs_sch_year_num smallint,
	crs_sch_year_fk smallint
);
-- ddl-end --
ALTER TABLE public.crs_school_year OWNER TO postgres;
-- ddl-end --

-- object: public.crs_classe | type: TABLE --
-- DROP TABLE IF EXISTS public.crs_classe CASCADE;
CREATE TABLE public.crs_classe(
	crs_cls_pk integer NOT NULL,
	crs_cls_letter varchar(2),
	crs_cls_fk integer
);
-- ddl-end --
ALTER TABLE public.crs_classe OWNER TO postgres;
-- ddl-end --

-- object: public.crs_teaching_unit | type: TABLE --
-- DROP TABLE IF EXISTS public.crs_teaching_unit CASCADE;
CREATE TABLE public.crs_teaching_unit(
	crs_teachunit_pk integer,
	crs_teachunit_name varchar,
	crs_teachunit_classement varchar(3),
	crs_teachunit_codification varchar,
	crs_teachunit_domain integer,
	crs_teachunit_critical boolean,
	crs_teachunit_periods_number integer,
	crs_teachunit_ects_number integer,
	crs_teachunit_fk integer
);
-- ddl-end --
ALTER TABLE public.crs_teaching_unit OWNER TO postgres;
-- ddl-end --

-- object: public.cursus | type: TABLE --
-- DROP TABLE IF EXISTS public.cursus CASCADE;
CREATE TABLE public.cursus(
	crs_pk integer,
	crs_dpt_fk integer NOT NULL,
	crs_sct_fk integer,
	crs_deg_fk smallint,
	crs_schyear_fk smallint,
	crs_cls_fk smallint,
	crs_teachunit_fk smallint
);
-- ddl-end --
ALTER TABLE public.cursus OWNER TO postgres;
-- ddl-end --

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users(
	usr_pk smallint,
	usr_firstname varchar,
	usr_lastname varchar,
	usr_role smallint,
	usr_school smallint,
	usr_cursus smallint,
	usr_coord_fk smallint
);
-- ddl-end --
ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: public.school | type: TABLE --
-- DROP TABLE IF EXISTS public.school CASCADE;
CREATE TABLE public.school(
	sch_entity smallint,
	sch_site smallint,
	sch_director smallint
);
-- ddl-end --
ALTER TABLE public.school OWNER TO postgres;
-- ddl-end --

-- object: public.usr_role | type: TABLE --
-- DROP TABLE IF EXISTS public.usr_role CASCADE;
CREATE TABLE public.usr_role(
	usr_rol_pk smallint,
	usr_rol_name varchar,
	usr_rol_permission smallint
);
-- ddl-end --
ALTER TABLE public.usr_role OWNER TO postgres;
-- ddl-end --

-- object: public.usr_groupe | type: TABLE --
-- DROP TABLE IF EXISTS public.usr_groupe CASCADE;
CREATE TABLE public.usr_groupe(

);
-- ddl-end --
ALTER TABLE public.usr_groupe OWNER TO postgres;
-- ddl-end --

-- object: public.usr_permission | type: TABLE --
-- DROP TABLE IF EXISTS public.usr_permission CASCADE;
CREATE TABLE public.usr_permission(
	usr_perm_pk smallint,
	usr_perm_name smallint,
	usr_perm_id smallint
);
-- ddl-end --
ALTER TABLE public.usr_permission OWNER TO postgres;
-- ddl-end --

-- object: public.usr_coordonee | type: TABLE --
-- DROP TABLE IF EXISTS public.usr_coordonee CASCADE;
CREATE TABLE public.usr_coordonee(

);
-- ddl-end --
ALTER TABLE public.usr_coordonee OWNER TO postgres;
-- ddl-end --

-- object: public.application | type: TABLE --
-- DROP TABLE IF EXISTS public.application CASCADE;
CREATE TABLE public.application(
	app_pk smallint,
	app_name varchar
);
-- ddl-end --
ALTER TABLE public.application OWNER TO postgres;
-- ddl-end --

-- object: sch_sit_entity_fk | type: CONSTRAINT --
-- ALTER TABLE public.sch_site DROP CONSTRAINT IF EXISTS sch_sit_entity_fk CASCADE;
ALTER TABLE public.sch_site ADD CONSTRAINT sch_sit_entity_fk FOREIGN KEY (sch_sit_entity)
REFERENCES public.sch_entity (sch_ent_pk) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: crs_dpt_fk | type: CONSTRAINT --
-- ALTER TABLE public.crs_department DROP CONSTRAINT IF EXISTS crs_dpt_fk CASCADE;
ALTER TABLE public.crs_department ADD CONSTRAINT crs_dpt_fk FOREIGN KEY (crs_dpt_fk)
REFERENCES public.sch_site (sch_sit_pk) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: crs_sct_dpt_fk | type: CONSTRAINT --
-- ALTER TABLE public.crs_section DROP CONSTRAINT IF EXISTS crs_sct_dpt_fk CASCADE;
ALTER TABLE public.crs_section ADD CONSTRAINT crs_sct_dpt_fk FOREIGN KEY (crs_sct_dept_fk)
REFERENCES public.crs_department (crs_dpt_fk) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: crs_deg_fk | type: CONSTRAINT --
-- ALTER TABLE public.crs_degree DROP CONSTRAINT IF EXISTS crs_deg_fk CASCADE;
ALTER TABLE public.crs_degree ADD CONSTRAINT crs_deg_fk FOREIGN KEY (crs_deg_fk)
REFERENCES public.crs_section (crs_sct_pk) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


