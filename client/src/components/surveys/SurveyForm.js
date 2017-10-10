import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'
import _ from 'lodash'



class SurveyForm extends Component {
  renderFields () {
    return _.map(formFields, ({label, name}) => {
      return <Field
        component={SurveyField}
        type="text"
        label={label}
        name={name}
        key={name}
      />
    })
  }

  render () {
    return (
      <div className="container">
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">取消</Link>
          <button type="submit" className="teal btn-flat right white-text">
            下一步
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients || '')

  _.each(formFields, ({label, name}) => {
    if (!values[name]) {
      errors[name] = `${label}内容不能为空！`
    }
  })

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm)