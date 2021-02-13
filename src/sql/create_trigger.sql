/* create function for trigger */
CREATE OR REPLACE FUNCTION bonus_day_off() RETURNS TRIGGER AS $$ BEGIN
UPDATE teachers
SET days_off = days_off + 1
WHERE days_off % 5 = 0
    AND days_off != 0;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
/* implement trigger */
CREATE TRIGGER update_days_off_bonus
AFTER
UPDATE ON teachers FOR EACH ROW EXECUTE PROCEDURE bonus_day_off()