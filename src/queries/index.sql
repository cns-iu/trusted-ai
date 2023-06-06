CREATE TEMP VIEW foo AS
SELECT soc_id AS "Code", title AS "Occupation", job_zone AS "Job Zone"
FROM public.job_zones;

\t
\a
\o index.json
SELECT array_to_json(array_agg(ROW_TO_JSON(r)), TRUE)
FROM (SELECT * FROM foo) AS r;
