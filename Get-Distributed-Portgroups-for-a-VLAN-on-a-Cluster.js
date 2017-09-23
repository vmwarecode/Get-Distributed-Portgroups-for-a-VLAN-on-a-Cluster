//Action Inputs:
//  cluster : VC:ClusterComputeResource
//  vlan    : Number
//
//Action Result: Array/VC:DistributedVirtualPortgroup


var toReturn = new Array();

var networks = cluster.network;

for(var i=0; i<networks.length; i++) {
    if (networks[i] instanceof VcDistributedVirtualPortgroup
        && !isUplinkPortgroup(networks[i])) {
        if (networks[i].config.defaultPortConfig.vlan instanceof VcVmwareDistributedVirtualSwitchVlanIdSpec) {
            if (networks[i].config.defaultPortConfig.vlan.vlanId == vlan) {
                System.log("Found matching DVPortGroup: "+networks[i].name);
                toReturn.push(networks[i]);
            }
        }
    }
}
if (toReturn.length > 0) {
    return toReturn;
} 
throw ("Could not find a dvPortgroup for vlan: "+vlan+" in cluster: "+cluster.name);


////////////////////////////////////

function isUplinkPortgroup(dvPortgroup) {
    var dvs = dvPortgroup.config.distributedVirtualSwitch;
    var uplinkPGs = dvs.config.uplinkPortgroup;

    for (var u in uplinkPGs) {
        if (uplinkPGs[u].id === dvPortgroup.id) {
            return true;
        }
    }
    return false;
}
