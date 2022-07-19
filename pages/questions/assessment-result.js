import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import PageLayout from '../../components/page-layout'
import QuestionService from '../../services/questionservice'

export default function AssessmentResult(props) {
    const router = useRouter()
    const [firstname, setFirstname] = useState('')
    const [score, setScore] = useState('')

    const questionService = new QuestionService()

    useEffect(() => {
        questionService.getAssessmentTrack().then(res => {
            if (res) {
                if (res.data.status === 'success') {
                    setScore(res.data.assessmentTrack.score)
                }
            }
        })
        setFirstname(props.user.name)
    }, [])


    return (
        <div className="grid grid-nogutter surface-0 text-800">
            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                    <span className="block text-6xl font-bold mb-1">You score: {score}
                    </span>
                    <span className="block text-4xl font-bold mb-1">
                        {score > 0 ? 'You are   Extrovert' : ''}
                        {score <= 0 ? 'You are a Introvert' : ''}
                    </span>
                </section>
            </div>
        </div>
    );
}

AssessmentResult.getLayout = function getLayout(page) {
    return (
        <Layout title="AssessmentResult">
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