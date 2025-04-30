//Scripted-Condition: Checks if the user belongs to the assigned group.

var userGroups = gs.getUser().getMyGroups();
    var assignGroup = current.assignment_group;
    if (assignGroup) {
        return userGroups.indexOf(assignGroup.sys_id.toString()) !== -1;
    }
    return false;
})();
