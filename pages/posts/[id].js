import Layout from '../../components/layout';
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'

// Return a list of possible value for id
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

// Fetch necessary data for the blog post using params.id
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}

export default function Post({ postData }) {
    console.log('postData: ', postData);
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
        <br/>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    )
  }