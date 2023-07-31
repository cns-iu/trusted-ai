CREATE TEMP VIEW foo AS
SELECT soc_id AS "Code", title AS "Occupation", alt_title as "Alt Title"
FROM public.alt_titles;

\t
\a
\o src/assets/data/alt_titles.json
SELECT array_to_json(array_agg(ROW_TO_JSON(r)), TRUE)
FROM (SELECT * FROM foo) AS r;
