var roles = [
    'Change Management',
    'change_coordinator',
    'change_manager',
    'sn_change_cab.cab_manager',
    'sn_change_comments_write',
    'sn_chg_soc.change_soc_admin',
    'sn_sttrm_condition_read',
    'ia_admin',
    'incident_manager',
    'itil',
    'itil_admin',
    'major_incident_manager',
    'sn_comm_management.comm_plan_admin',
    'sn_incident_comments_write',
    'sn_incident_write',
    'sn_ind_tsm_core.noc_agent',
    'sn_service_desk_agent',
    'problem_admin',
    'problem_coordinator',
    'problem_manager',
    'problem_task_analyst',
    'sn_problem_comments_write',
    'sn_problem_write',
    'dm_user_criteria_read',
    'rm_product_user',
    'rm_release_phase_user',
    'rm_release_user',
    'sn_exam.catalog_admin',
    'sn_ind_tsm_core.noc.agent',
    'sn_request_comments_write',
    'sn_request_write',
    'sn_uni_requr_admin',
    'sn_uni_requr_service_owner',
    'sn_incident_read'
];

var usersWithRoles = [];

// Itera sobre cada role
for (var i = 0; i < roles.length; i++) {
    var roleGr = new GlideRecord('sys_user_role');
    roleGr.addQuery('name', roles[i]);
    roleGr.query();

    if (roleGr.next()) {
        var userRoleGr = new GlideRecord('sys_user_has_role');
        userRoleGr.addQuery('role', roleGr.getUniqueValue());
        userRoleGr.query();

        while (userRoleGr.next()) {
            var userGr = new GlideRecord('sys_user');
            if (userGr.get(userRoleGr.user)) {
                var userName = userGr.getDisplayValue('user_name');
                // Adiciona o usuário se não estiver já na lista
                if (usersWithRoles.indexOf(userName) === -1) {
                    usersWithRoles.push(userName);
                }
            }
        }
    }
}

// Formatação da saída
var totalUsers = usersWithRoles.length;

if (totalUsers > 0) {
    gs.info('Usuários com as roles especificadas (' + totalUsers + ' encontrados):\n' + usersWithRoles.join('\n'));
} else {
    gs.info('Nenhum usuário encontrado com as roles especificadas.');
}
