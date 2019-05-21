var StateManager = function (options) {
  this.channelGrid = options.channelGrid;
  this.stateRefs = options.stateRefs;
};

StateManager.prototype.create = function (state) {
  var stateCellIndex = this.channelGrid.getCellIndex(state);
  var stateRef = {
    id: state.id,
    tcid: stateCellIndex, // Target cell index.
    type: state.type,
    create: state,
    message: ''
  };
  if (state.swid != null) {
    stateRef.swid = state.swid;
  }
  this.stateRefs[state.id] = stateRef;
  return stateRef;
};

// You can only update through operations which must be interpreted
// by your cell controllers (cell.js).
StateManager.prototype.update = function (stateRef, operation) {
  this.stateRefs[stateRef.id].op = operation;
};

StateManager.prototype.delete = function (stateRef) {
  this.stateRefs[stateRef.id].delete = 1;
};

StateManager.prototype.updateChat = function (stateRef, message) {
  const notAllowed = ['meta', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
  if (!notAllowed.includes(message.toLowerCase())) {
    this.stateRefs[stateRef.id].op = message;
  }
};

module.exports.StateManager = StateManager;
