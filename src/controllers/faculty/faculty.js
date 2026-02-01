import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';
    const facultyMembers = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyMembers,
        currentSort: sortBy
    });
};

// Route handler for individual faculty detail pages
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const member = getFacultyById(facultyId);

    // If faculty doesn't exist, trigger the 404 error handler
    if (!member) {
        const err = new Error(`Faculty member "${facultyId}" not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: `${member.name} - Profile`,
        faculty: member
    });
};

export { facultyListPage, facultyDetailPage };