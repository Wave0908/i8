
SELECT * from ctl_fld where tname = 'fg3_customfile_20221010' and chn = '核准标记'

SELECT * from ctl_fld where tname = 'p_form0000700347_m' and fieldname = 'p_form0000700030_m'

SELECT * from ctl_fld where tname = 'reort_t_m' and chn = '审核标志'

SELECT * from ctl_fld where tname = 'hr_epm_main' and chn like '%部门编号%'

SELECT * from ctl_fld where tname = 'p_form0000700162_m' and fieldname = 'asr_flg'

phid_sencomp  -> phid_supply_ent

phid_compno -> phid_supply_ent

getDate() -> CURRENT_TIMESTAMP

phid_deptno -> phid_dept

transdt -> bill_dt

curr_type -> phid_fcur

invoice_sen -> 

Invoice_Cmp -> phid_inv_comp

phid_schcomp -> phid_sgcomp

auditflg -> app_status

billno -> bill_no

pc_no -> bill_no

bill_no -> msunit

ent_id -> phid_ent

pc -> phid_pc

pc_id -> phid_pc

project_name -> bill_name

phid_msunit -> msunit

chk_flg -> app_status

m_code -> pphid

ischeck -> is_check/app_status

cat_phid -> phid_org

phid_ocode -> phid_org

phid_tr_proj -> phid_pc

cno -> bill_no

cname -> bill_name

ocode -> phid_org

must_phid -> pphid

cboo -> phid_org

dept -> phid_dept

phid_reccomp -> phid_customer_ent

phid_auditpsn -> phid_app

auditdt -> app_dt

chkcardno -> bill_no

phid_chkpsn -> phid_app

phid_itemdata -> phid_itemid

to_char

'YYYY-MM-DD'

'YYYY-MM-DD HH24:MI:SS'

year(dateadd(month,-1,getDate())) -> EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month')

convert(varchar(4),dateadd(month,-1,getDate()),112) as 'year', -> to_char(CURRENT_DATE - INTERVAL '1 mxonth', 'YYYY') AS "year",  
       
month(dateadd(month,-1,getDate()))  as 'month',   ->  EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AS "month", 

convert(varchar(4),dateadd(month,-1,getDate()),112)  +'-'+ right(convert(varchar(6),dateadd(month,-1,getDate()),112),2)  as year_month, -> concat(to_char(CURRENT_DATE - INTERVAL '1 month', 'YYYY'), '-', right(to_char(CURRENT_DATE - INTERVAL '1 month', 'MM'),2)) as year_month, 

to_char(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM-DD')

concat(cast(COALESCE(kbh.phid,'') as varchar(100)), '_', kbh.bill_no) as DFID,


SELECT 
  asr_table,
  asr_code,
  REPLACE(
    STRING_AGG(
      CONCAT(
        'http://192.168.3.72:9089/MCC22ToFSSC/Attach/GetFile',
        '?asr_code=', asr_code,
        '&asr_table=reort_t_m',
        '&asr_attach_table=attachment_record',
        '&filename=', asr_name
      ),
      ','
    ),
    'amp;', ''
  ) AS asr_name
FROM attachment_record
WHERE asr_table = 'reort_t_m'
GROUP BY asr_table, asr_code;






SELECT * FROM OPENQUERY(LCGXZX,'select * from LC0019999.CWSFK where U_HTID IS NOT NULL ')


