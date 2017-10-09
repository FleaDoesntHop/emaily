import React from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import _ from 'lodash'
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const reviewFields = _.map(formFields, ({label, name}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  })

  return (
    <div>
      <h5>审核并确认信息：</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >返回</button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues)}
      >
        提交并发送
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(SurveyFormReview)