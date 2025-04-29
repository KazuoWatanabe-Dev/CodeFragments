//Retrieves the last comment from the approvers of the related incident in ServiceNow.

var grJournal = new GlideRecord('sys_journal_field');
grJournal.addQuery('element_id', '5bb7bf221b18ae500c642f8fe54bcbdd');
grJournal.orderByDesc('sys_created_on');
grJournal.setLimit(1);
grJournal.query();

if (grJournal.next()) {
    var lastComment = grJournal.getValue('value');
    gs.print(lastComment);
}
