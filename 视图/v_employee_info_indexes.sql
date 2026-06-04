-- For table hr_epm_station_20230527
-- Index for the main join condition in the anti-join
CREATE INDEX IF NOT EXISTS idx_hr_epm_station_empstatus ON hr_epm_station_20230527 (empstatus);
-- Indexes for other JOIN conditions
CREATE INDEX IF NOT EXISTS idx_hr_epm_station_admclass ON hr_epm_station_20230527 (admclass);
CREATE INDEX IF NOT EXISTS idx_hr_epm_station_station ON hr_epm_station_20230527 (station);
CREATE INDEX IF NOT EXISTS idx_hr_epm_station_dept ON hr_epm_station_20230527 (dept);

-- For table hr_base_enum
-- Composite index for the WHERE and JOIN conditions in the CTE
CREATE INDEX IF NOT EXISTS idx_hr_base_enum_ctype_ccode ON hr_base_enum (ctype, ccode);
-- Index for the selected column in CTE, which is used for joining later. (phid is likely a PK, but adding for completeness)
CREATE INDEX IF NOT EXISTS idx_hr_base_enum_phid ON hr_base_enum (phid);

-- For table hr_epm_status_property
-- Composite index for the WHERE and JOIN conditions in the CTE
CREATE INDEX IF NOT EXISTS idx_hr_epm_status_property_isstatus_ccode ON hr_epm_status_property (isstatus, ccode);

-- For other joined tables (phid is likely a PK, but adding for completeness)
CREATE INDEX IF NOT EXISTS idx_fg_simple_data_phid ON fg_simple_data (phid);
CREATE INDEX IF NOT EXISTS idx_fg_ogm_station_phid ON fg_ogm_station (phid);
CREATE INDEX IF NOT EXISTS idx_dept_phid ON dept (phid);