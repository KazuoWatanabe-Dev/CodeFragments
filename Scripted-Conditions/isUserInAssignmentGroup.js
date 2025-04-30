//Scripted-Condition: Checks if the user belongs to the assigned group.
//Tools for ServiceNow required </>

//Version 1.0
var userGroups = gs.getUser().getMyGroups();
    var assignGroup = current.assignment_group;
    if (assignGroup) {
        return userGroups.indexOf(assignGroup.sys_id.toString()) !== -1;
    }
    return false;
})();

//Version 2.0
(function() {
    if (current.approval == 'approved' || current.approval == 'rejected') return false;
    var groupId = current.assignment_group?.sys_id.toString();
    return groupId && gs.getUser().getMyGroups().includes(groupId);
})();
