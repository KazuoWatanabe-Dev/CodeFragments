/Journal Entry[sys_journal_field]
//When after

// ==== Execution ====

var elementId = current.element_id;
var approver = new GlideRecord('sysapproval_approver');
var incidente = new GlideRecord('incident');

//query in approver to fetch incident sys_id
approver.addQuery('sys_id', elementId);
approver.query();
approver.next();

//query in incident to fetch number
incidente.addQuery('sys_id', approver.getValue('sysapproval'));
incidente.query();
incidente.next();

var incidentNumber = incidente.getValue('number');

var lastComment = getLastCommentFromJournal(elementId);

if (lastComment) {
    addWorkNoteToIncident(incidentNumber, lastComment);
}

// Function to fetch the latest comment from sys_journal_field
function getLastCommentFromJournal(elementId) {
    var grJournal = new GlideRecord('sys_journal_field');
    grJournal.addQuery('element_id', elementId);
    grJournal.orderByDesc('sys_created_on');
    grJournal.setLimit(1);
    grJournal.query();

    if (grJournal.next()) {
        return grJournal.getValue('value');
    }
}

// Function to add the comment as a work note on the incident
function addWorkNoteToIncident(incidentNumber, workNote) {

    var grIncident = new GlideRecord('incident');
    grIncident.addQuery('number', incidentNumber);
    grIncident.query();

    if (grIncident.next()) {
        grIncident.work_notes = workNote + '\n' + (grIncident.work_notes || '');
        grIncident.update();

    }

}
