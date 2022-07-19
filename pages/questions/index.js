import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import PageLayout from '../../components/page-layout'
import QuestionService from '../../services/questionservice'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'

export default function Questions(props) {
  const router = useRouter()
  const [firstname, setFirstname] = useState('')
  const [questions, setQuestions] = useState([])
  const [assessment, setAssessment] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])


  const questionService = new QuestionService()

  useEffect(() => {
    // get questionsa


    questionService.getQuestions().then(res => {
      if (res) {
        setAssessment(res.data[0].assessment_id)
        setQuestions(res.data)
      }
    })
    setFirstname(props.user.name)
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push('/')
  }

  const handleSubmitAnswers = (e) => {
    e.preventDefault();
   // console.log(assessment)
    questionService.trackAssessment(assessment, selectedOptions).then(res => {
      if(res) {
        if(res.data.status === 'success') {
        // console.log(res.data)
          router.push({
                   pathname :'/questions/assessment-result'
                 })
        
        }
       // console.log(res.data)
      }
    })
  }

  return (
    <div className="grid grid-nogutter surface-0 text-800">
      <form onSubmit={handleSubmitAnswers}>
        <ul>
          {questions.map(question => (
            <div key={question.id}>
              <h5>{question.question}</h5>
              {
                question.options.map(option => (
                  <div key={option.id} className="field-radiobutton">
                    <input className="p-radiobutton" type="radio" name={question.id} value={option.id} onChange={(e) => {
                      setSelectedOption(e.target.value)
                      // push to selectedOptions by question id
                      setSelectedOptions(prev => {
                        const newSelectedOptions = { ...prev }
                        newSelectedOptions[question.id] = e.target.value
                        return newSelectedOptions
                      })
                    }
                    } />
                    <label className="p-radiobutton-label" htmlFor={option.id}>{option.option}</label>
                  </div>
                ))
              }
            </div>
          ))}
        </ul>
        <Button type="submit" label="Submit" icon="pi pi-check" className="p-button-success" />
      </form>
    </div>
  )
}
Questions.getLayout = function getLayout(page) {
  return (
    <Layout title="Questions">
      <PageLayout>{page}</PageLayout>
    </Layout>
  )
}
export const getServerSideProps = ({ req, res }) => {

  let user = null;
  let isAuthenticated = false;

  if (req.cookies.user && req.cookies.authenticated === 'true') {

    isAuthenticated = true;
    user = JSON.parse(req.cookies.user);
  } else {
    res.writeHead(302, {
      Location: '/'
    })
    res.end()
  }

  return {
    props: {
      user,
      isAuthenticated
    }
  }
}

