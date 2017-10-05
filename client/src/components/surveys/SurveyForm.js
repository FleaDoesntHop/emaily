import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import _ from 'lodash'

const FIELDS = [
  {label: '标题', name: 'title'},
  {label: '邮件主题', name: 'subject'},
  {label: '邮件正文', name: 'body'},
  {label: '收件人', name: 'emails'}
];

class SurveyForm extends Component {
  renderFields () {
    return _.map(FIELDS, ({label, name}) => {
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
          onSubmit={this.props.handleSubmit(values => console.log(values))}
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

  _.each(FIELDS, ({label, name}) => {
    if (!values[name]) {
      errors[name] = `${label}内容不能为空！`
    }
  })

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyForm)