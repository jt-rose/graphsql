/* Create view */
CREATE OR REPLACE VIEW it_salaries AS
SELECT salary
FROM employees e
    JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept = 'IT'
ORDER BY salary DESC;
/* Select from view */
SELECT *
FROM it_salaries;