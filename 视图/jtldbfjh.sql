
CREATE VIEW jtldbfjh AS
WITH base_data AS (
    SELECT
        p_form0000700230_d.phid, 
        p_form0000700230_m.wf_flag AS is_wf,
        TO_CHAR(p_form0000700230_d.u_jhbfrq, 'YYYY-MM-DD') AS u_jhbfrq,
        p_form0000700230_d.userhelp_1, 
        p_form0000700230_d.u_xcmjtld
    FROM
        p_form0000700230_d
    LEFT JOIN
        p_form0000700230_m ON p_form0000700230_m.phid = p_form0000700230_d.pphid 
),
split_data AS (
    SELECT 
        b.phid,
        b.is_wf,
        b.u_jhbfrq,
        b.userhelp_1,
        trim(split.val) AS u_xcmjtld
    FROM base_data b
    CROSS JOIN regexp_split_to_table(b.u_xcmjtld, ',') AS split(val)
)
SELECT 
    phid,
    u_jhbfrq,
    userhelp_1,
    u_xcmjtld,
    is_wf
FROM split_data
WHERE u_xcmjtld <> '';