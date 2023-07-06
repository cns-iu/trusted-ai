CREATE TEMP VIEW foo1 AS
SELECT
  a.soc_id,
  a.title,
  a.descr,
  string_agg(alt_title, ', '::text) AS alt_titles,
  c.job_zone,
  d.experience,
  d.education,
  d.job_training,
  d.example,
  d.svp_range
FROM occs a
  LEFT JOIN alt_titles b ON a.soc_id = b.soc_id
  LEFT JOIN job_zones c ON a.soc_id = c.soc_id
  LEFT JOIN job_zone_refs d ON c.job_zone = d.job_zone
WHERE
  a."grouping" = 'Detailed Occupation'::text OR a."grouping" = 'Detailed Occupation Specialization'::text
GROUP BY
	a.soc_id,
	c.job_zone,
	d.experience,
	d.education,
	d.job_training,
  d.example,
	d.svp_range;

CREATE TEMP VIEW foo2 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as work_tasks
FROM profile_sec_four_worktasks as r
WHERE r."rec_suppress" = 'N' OR r."rec_suppress" IS NULL
GROUP BY r.soc_id;

CREATE TEMP VIEW foo3 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as salary_states
FROM profile_sec_five_oews_state as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo4 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as tech_skills
FROM tech_skills as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo5 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as work_behaviors
FROM profile_sec_two as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo6 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as salary_nat
FROM profile_sec_five_oews_nat as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo7 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as salary_ind
FROM profile_sec_five_oews_ind as r
GROUP BY r.soc_id;

\t
\a
\o src/assets/data/profile_data.json
SELECT array_to_json(array_agg(ROW_TO_JSON(r)), TRUE)
FROM (
  SELECT foo1.*, foo2.work_tasks, foo3.salary_states, foo4.tech_skills, foo5.work_behaviors, foo6.salary_nat, foo7.salary_ind
  FROM foo1
    LEFT JOIN foo2 on foo2.soc_id = foo1.soc_id
    LEFT JOIN foo3 on foo3.soc_id = foo1.soc_id
    LEFT JOIN foo4 on foo4.soc_id = foo1.soc_id
    LEFT JOIN foo5 on foo5.soc_id = foo1.soc_id
    LEFT JOIN foo6 on foo6.soc_id = foo1.soc_id
    LEFT JOIN foo7 on foo7.soc_id = foo1.soc_id
  ) AS r;
