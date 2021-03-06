import Actions from '../helpers/actionConstants';
import { List } from 'immutable';

export default function rows(state = List(), action) {
  let newState = state;
  let rowIndex;
  let sourceRow;

  if (!action) {
    return newState;
  }

  switch (action.type) {
    case Actions.ROWS_ADD_ONE:
      newState = addManyRows(newState, List([action.row]));
      break;
    case Actions.ROWS_ADD_MANY:
      newState = addManyRows(newState, action.rows);
      break;
    case Actions.ROWS_REPLACE_ALL:
      newState = action.rows;
      break;
    case Actions.ROWS_REMOVE_ONE:
      rowIndex = newState.findIndex((row) => row.get('id') === action.id);
      if (rowIndex === -1) {
        break;
      }
      newState = newState.splice(rowIndex, 1);
      break;
    case Actions.ROWS_REMOVE_ONE_ZONE:
      newState = newState
        .map((row) => {
          if (!row.get('zones') || !row.get('zones').size) {
            return row;
          }
          const zoneIndex = row.get('zones').findIndex((zone) => zone.get('id') === action.zone.get('id'));
          if (zoneIndex === -1) {
            return row;
          }

          return row.deleteIn(['zones', zoneIndex]);
        });
      break;
    case Actions.ROWS_INSERT_ZONE:
      newState = newState
        .map((row) => {
          let rowId = row.get('id');
          if (rowId === action.row.get('id')) {
            //insert source zone into source target location
            let targetZones = row.get('zones');
            if(!isNaN(Number(action.columnIndex))) {
              return row.set('zones', targetZones.insert(action.columnIndex, action.zone));
            } else {
              return row.set('zones', targetZones.push(action.zone));
            }
          }
          return row;
        });
      break;
    case Actions.EDITOR_UPDATE_ZONE:
      newState = newState
        .map((row) => {
          if (!row.get('zones') || !row.get('zones').size) {
            return row;
          }
          const zoneIndex = row.get('zones').findIndex((zone) => zone.get('id') === action.zone.get('id'));
          if (zoneIndex === -1) {
            return row;
          }
          return row.set('zones', row.get('zones').set(zoneIndex, action.zone));
        });
      break;
    case Actions.EDITOR_MOVE_ROW:
      sourceRow = newState.get(action.sourceIndex);
      newState = newState.delete(action.sourceIndex).insert(action.targetIndex, sourceRow);
      break;
  }

  return newState;
}

function addManyRows(state, rows) {
  let newState = state;

  // Find the index of any rows with no zones, which we'll replace
  let blankRowIndex = newState.findIndex((row) => !row.get('zones') || row.get('zones').size === 0);

  rows.forEach((row) => {
    if (blankRowIndex !== -1) {
      newState = newState.set(blankRowIndex, row);
      blankRowIndex = -1;
    } else {
      newState = newState.push(row);
    }
  });
  return newState;
}
