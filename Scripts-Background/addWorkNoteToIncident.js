// Uso do script
var incidentNumber = 'INC0032868';
var workNoteText = 'Comentário adicionado via script nas work notes 220';
addWorkNoteToIncident(incidentNumber, workNoteText);

// Script para adicionar work notes a um incidente específico
function addWorkNoteToIncident(incidentNumber, workNote) {
    try {
        // Buscar o incidente
        var grIncident = new GlideRecord('incident');
        grIncident.addQuery('number', incidentNumber);
        grIncident.query();
        
        if (grIncident.next()) {
            // Adicionar work notes usando o método recomendado
            grIncident.work_notes = workNote + '\n' + (grIncident.work_notes || '');
            var success = grIncident.update();
            
            if (success) {
                gs.info('Work note adicionada com sucesso ao incidente ' + incidentNumber);
                return true;
            } else {
                gs.warn('Falha ao atualizar o incidente ' + incidentNumber);
                return false;
            }
        } else {
            gs.warn('Incidente ' + incidentNumber + ' não encontrado');
            return false;
        }
    } catch (ex) {
        gs.error('Erro ao adicionar work note: ' + ex.getMessage());
        return false;
    }
}
