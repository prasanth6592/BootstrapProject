(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .filter('get_unselected', function() {
        return function(items) {
            var filtered = [];
            angular.forEach( items, function(item) {
                if ( ! item.selected ) {
                    filtered.push( item );
                }
            });
            return filtered;
        };
    })
    .filter('get_selected', function() {
        return function(items) {
            var filtered = [];
            angular.forEach( items, function(item) {
                //console.log("FILTERING SELECTED ROLE", item.auth_role_guid);
                if ( item.selected ) {
                    filtered.push( item );
                }
            });
            return filtered;
        };
    })
    .filter('role_filter', function() {
        return function(roles, role_filter) {
            //console.log("THE FILTER:", role_filter);
            var filtered = [];
            angular.forEach( roles, function(role) {
                if ( role_filter.tier === "" || role_filter.tier === role.tier_desc) {
                    if (role_filter.group === "" || role_filter.group === role.tier_group_desc) {
                        if (role_filter.subgroup === "" || role_filter.subgroup === role.tier_subgroup_desc) {
                            if (role_filter.partner === "" || role_filter.partner === role.partner_guid) {
                                if (role_filter.county === "" || role_filter.county === role.county_code) {
                                    if (role_filter.municipality === "" || role_filter.municipality === role.muni_code) {
                                        //console.log(">>>PUSHED ROLE");
                                        filtered.push(role);
                                    }
                                }
                            }
                        }
                    }
                }
            });
            return filtered;
        };
    })
;


