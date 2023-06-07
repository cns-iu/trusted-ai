CREATE MATERIALIZED VIEW edu_rl_wide AS
SELECT
    a.soc_id,
    a.title,
	a.scale_name,
	a.n,
    MAX(a.data_value) FILTER (WHERE a.category = '1') AS "1",
    MAX(a.data_value) FILTER (WHERE a.category = '2') AS "2",
    MAX(a.data_value) FILTER (WHERE a.category = '3') AS "3",
    MAX(a.data_value) FILTER (WHERE a.category = '4') AS "4",
	MAX(a.data_value) FILTER (WHERE a.category = '5') AS "5",
	MAX(a.data_value) FILTER (WHERE a.category = '6') AS "6",
	MAX(a.data_value) FILTER (WHERE a.category = '7') AS "7",
	MAX(a.data_value) FILTER (WHERE a.category = '8') AS "8",
	MAX(a.data_value) FILTER (WHERE a.category = '9') AS "9",
	MAX(a.data_value) FILTER (WHERE a.category = '10') AS "10",
	MAX(a.data_value) FILTER (WHERE a.category = '11') AS "11",
	MAX(a.data_value) FILTER (WHERE a.category = '12') AS "12"
FROM public.education AS a
WHERE a.scale_id = 'RL'
GROUP BY a.soc_id, a.title, a.scale_name, a.n
	
CREATE MATERIALIZED VIEW edu_rw_wide AS
SELECT
    a.soc_id,
    a.title,
	a.scale_name,
	a.n,
    MAX(a.data_value) FILTER (WHERE a.category = '1') AS "1",
    MAX(a.data_value) FILTER (WHERE a.category = '2') AS "2",
    MAX(a.data_value) FILTER (WHERE a.category = '3') AS "3",
    MAX(a.data_value) FILTER (WHERE a.category = '4') AS "4",
	MAX(a.data_value) FILTER (WHERE a.category = '5') AS "5",
	MAX(a.data_value) FILTER (WHERE a.category = '6') AS "6",
	MAX(a.data_value) FILTER (WHERE a.category = '7') AS "7",
	MAX(a.data_value) FILTER (WHERE a.category = '8') AS "8",
	MAX(a.data_value) FILTER (WHERE a.category = '9') AS "9",
	MAX(a.data_value) FILTER (WHERE a.category = '10') AS "10",
	MAX(a.data_value) FILTER (WHERE a.category = '11') AS "11"
FROM public.education AS a
WHERE a.scale_id = 'RW'
GROUP BY a.soc_id, a.title, a.scale_name, a.n	
	
CREATE MATERIALIZED VIEW edu_pt_wide AS
SELECT
    a.soc_id,
    a.title,
	a.scale_name,
	a.n,
    MAX(a.data_value) FILTER (WHERE a.category = '1') AS "1",
    MAX(a.data_value) FILTER (WHERE a.category = '2') AS "2",
    MAX(a.data_value) FILTER (WHERE a.category = '3') AS "3",
    MAX(a.data_value) FILTER (WHERE a.category = '4') AS "4",
	MAX(a.data_value) FILTER (WHERE a.category = '5') AS "5",
	MAX(a.data_value) FILTER (WHERE a.category = '6') AS "6",
	MAX(a.data_value) FILTER (WHERE a.category = '7') AS "7",
	MAX(a.data_value) FILTER (WHERE a.category = '8') AS "8",
	MAX(a.data_value) FILTER (WHERE a.category = '9') AS "9"
FROM public.education AS a
WHERE a.scale_id = 'PT'
GROUP BY a.soc_id, a.title, a.scale_name, a.n;

CREATE MATERIALIZED VIEW edu_oj_wide AS
SELECT
    a.soc_id,
    a.title,
	a.scale_name,
	a.n,
    MAX(a.data_value) FILTER (WHERE a.category = '1') AS "1",
    MAX(a.data_value) FILTER (WHERE a.category = '2') AS "2",
    MAX(a.data_value) FILTER (WHERE a.category = '3') AS "3",
    MAX(a.data_value) FILTER (WHERE a.category = '4') AS "4",
	MAX(a.data_value) FILTER (WHERE a.category = '5') AS "5",
	MAX(a.data_value) FILTER (WHERE a.category = '6') AS "6",
	MAX(a.data_value) FILTER (WHERE a.category = '7') AS "7",
	MAX(a.data_value) FILTER (WHERE a.category = '8') AS "8",
	MAX(a.data_value) FILTER (WHERE a.category = '9') AS "9"
FROM public.education AS a
WHERE a.scale_id = 'OJ'
GROUP BY a.soc_id, a.title, a.scale_name, a.n;
