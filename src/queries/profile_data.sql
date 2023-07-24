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

CREATE TEMP VIEW foo8 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as projections
FROM profile_sec_sev_nem_prj_ind_curr as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo9 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as behaviors_abilities
FROM abilities_treemaps as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo10 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as behaviors_work_activities
FROM work_activities_treemaps as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo11 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as behaviors_skills
FROM skills_treemaps as r
GROUP BY r.soc_id;

CREATE TEMP VIEW foo12 AS
SELECT r.soc_id, array_to_json(array_agg(r)) as behaviors_knowledge
FROM knowledge_treemaps as r
GROUP BY r.soc_id;

\t
\a
\o tmp/profile_data.json
SELECT array_to_json(array_agg(ROW_TO_JSON(r)), TRUE)
FROM (
  SELECT
  foo1.*,
  foo2.work_tasks,
  foo3.salary_states,
  foo4.tech_skills,
  foo5.work_behaviors,
  foo6.salary_nat,
  foo7.salary_ind,
  foo8.projections,
  foo9.behaviors_abilities,
  foo10.behaviors_work_activities,
  foo11.behaviors_skills,
  foo12.behaviors_knowledge,
  profile_sec_sev_nem_prj_nat.per_change_10 as per_change_10_nat,
  profile_sec_sev_nem_prj_nat.employed as employed_nat,
  profile_sec_sev_nem_prj_nat.employed_10 as employed_10_nat,
  "outlook_brightFutures".designation as bright_futures,
  outlook_future_of_work.risk_group as automation_risk,
  outlook_near_future.projection as near_future
  FROM foo1
    LEFT JOIN foo2 on foo2.soc_id = foo1.soc_id
    LEFT JOIN foo3 on foo3.soc_id = foo1.soc_id
    LEFT JOIN foo4 on foo4.soc_id = foo1.soc_id
    LEFT JOIN foo5 on foo5.soc_id = foo1.soc_id
    LEFT JOIN foo6 on foo6.soc_id = foo1.soc_id
    LEFT JOIN foo7 on foo7.soc_id = foo1.soc_id
    LEFT JOIN foo9 on foo9.soc_id = foo1.soc_id
    LEFT JOIN foo8 on foo8.soc_id = foo1.soc_id
    LEFT JOIN profile_sec_sev_nem_prj_nat on profile_sec_sev_nem_prj_nat.soc_id = foo1.soc_id
    LEFT JOIN "outlook_brightFutures" on "outlook_brightFutures".soc_id = foo1.soc_id
    LEFT JOIN outlook_future_of_work on outlook_future_of_work.soc_id = foo1.soc_id
    LEFT JOIN outlook_near_future on outlook_near_future.soc_id = foo1.soc_id
    LEFT JOIN foo10 on foo10.soc_id = foo1.soc_id
    LEFT JOIN foo11 on foo11.soc_id = foo1.soc_id
    LEFT JOIN foo12 on foo12.soc_id = foo1.soc_id
  ) AS r;
