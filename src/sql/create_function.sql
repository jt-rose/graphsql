/* create function */
CREATE OR REPLACE FUNCTION add_day_off() RETURNS VOID AS $$ BEGIN
UPDATE teachers
SET days_off = days_off + 1;
RAISE NOTICE 'pto updated';
END;
$$ LANGUAGE plpgsql
/* call function */
SELECT add_day_off()