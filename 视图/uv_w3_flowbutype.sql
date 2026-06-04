CREATE OR REPLACE VIEW uv_w3_flowbutype (
    op_type,  -- 商业对象代码
    op_name,  -- 商业对象名称
    op_memo,  -- 备注
    approve_flag,  -- 审批流启用标志
    module_no  -- 模块标志
) AS (
    SELECT 
        op_type, 
        op_name, 
        op_memo,
        COALESCE(approve_flag, '0'),
        COALESCE(module_no, '05')
    FROM fg_operates
    UNION
    SELECT 
        sys_code, 
        doc_title, 
        c_descript,
        CAST('1' AS character varying) AS approve_flag,
        i6_sys
    FROM c_pfc_register
    WHERE u_type LIKE '_1%'
);