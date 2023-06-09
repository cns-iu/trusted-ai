CREATE TEMP VIEW foo AS
SELECT soc_id, title, descr, alt_titles
FROM public.profile_sec_one;

\t
\a
\o src/assets/data/job_descriptions.json
SELECT array_to_json(array_agg(ROW_TO_JSON(r)), TRUE)
FROM (SELECT * FROM foo) AS r;
