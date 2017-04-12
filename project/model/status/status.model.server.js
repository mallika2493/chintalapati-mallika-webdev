/**
 * Created by mallika2493 on 4/11/17.
 */

module.exports = function () {

    var api = {
        createStatus:createStatus,
        setModel:setModel,
        getAllStatusByActorId:getAllStatusByActorId,
        editStatus:editStatus,
        deleteStatus:deleteStatus
    };

    var mongoose = require('mongoose');

    var StatusSchema = require('./status.schema.server')();
    var StatusModel = mongoose.model('StatusModel', StatusSchema);

    return api;



    function setModel(_model) {
        model = _model;
    }

    function createStatus(actorId,status) {
        status.actorId = actorId;

        return StatusModel.create(status);
    }

    function getAllStatusByActorId(actorId) {

        return StatusModel.find({"actorId": actorId});
    }
    function editStatus(statusId,statusObj) {
        return StatusModel.update({_id: statusId}, {$set: statusObj});
    }

    function deleteStatus(statusId) {
        return StatusModel.remove({_id:statusId});

    }



};
