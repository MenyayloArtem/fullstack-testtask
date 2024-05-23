WITH RecursiveSubdivisions AS (
    -- Ќачальный уровень подразделени€ сотрудника "—отрудник 1"
    SELECT 
        s.id, 
        s.name, 
        s.parent_id, 
        0 AS sub_level
    FROM 
        subdivisions s
        JOIN collaborators c ON c.subdivision_id = s.id
    WHERE 
        c.id = 710253

    UNION ALL

    -- –екурсивное добавление всех нижесто€щих подразделений
    SELECT 
        s.id, 
        s.name, 
        s.parent_id, 
        rs.sub_level + 1
    FROM 
        subdivisions s
        JOIN RecursiveSubdivisions rs ON s.parent_id = rs.id
    WHERE 
        s.id NOT IN (100055, 100059)
),
FilteredCollaborators AS (
    -- ‘ильтраци€ сотрудников по нижесто€щим подразделени€м и возрасту
    SELECT 
        c.id, 
        c.name, 
        c.subdivision_id, 
        rs.sub_level,
        rs.name AS sub_name
    FROM 
        collaborators c
        JOIN RecursiveSubdivisions rs ON c.subdivision_id = rs.id
    WHERE 
        c.age < 40
),
SubdivisionsCount AS (
    -- ѕодсчет количества сотрудников в каждом подразделении
    SELECT 
        subdivision_id, 
        COUNT(*) AS colls_count
    FROM 
        collaborators
    GROUP BY 
        subdivision_id
) 
-- »тоговый запрос
SELECT 
    fc.id, 
    fc.name, 
    fc.sub_name, 
    fc.subdivision_id AS sub_id, 
    fc.sub_level, 
    sc.colls_count
FROM 
    FilteredCollaborators fc
    JOIN SubdivisionsCount sc ON fc.subdivision_id = sc.subdivision_id
ORDER BY 
    fc.sub_level ASC;
