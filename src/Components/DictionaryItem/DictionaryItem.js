import React from 'react';
import PropTypes from 'prop-types';


class DictionaryItem extends React.Component {
  // const { title, date } = dict;
  handleDeleteClick = () => {
    const { handleDelete, index } = this.props;
    handleDelete(index);
  }

  handleEditClick = () => {
    const { handleEdit, index } = this.props;
    handleEdit(index);
  }

  render() {
    const { dict: { title, date } } = this.props;
    const formatedDate = (new Date(date)).toLocaleDateString('en-GB', {
      minute: 'numeric', hour: 'numeric', month: 'numeric', year: 'numeric', day: 'numeric',
    });

    return (
      <li>
        <div className="item">
          <div className="name">{title}</div>
          <div className="date">{formatedDate}</div>
          <div className="edit" onClick={this.handleEditClick}>edit</div>
          <div className="delete" onClick={this.handleDeleteClick}>
            <i className="fas fa-trash-alt" />
            delete

          </div>
        </div>
      </li>
    );
  }
}

DictionaryItem.propTypes = {
  dict: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};


export default DictionaryItem;
