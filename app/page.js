'use client'
import { useEffect, useState } from 'react';
import styles from './recipes.css'
import { createClient } from 'contentful';
import { getRecipes } from './contentful';


export default function Recipes() {

    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('Most Recent')
    // const posts = await getPosts();

    useEffect(() => {
        async function init() {
          let recipes = await fetch('/api/get-recipes');
          setPosts(await recipes.json());
        }
        init();
    }, [])

    const getFontSize = (text) => {
        let length = text.length;
        return (1 / length) * 500 + 20
    }

    const handleSortChange = (e) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
        // console.log(posts[0].fields.date)
        let sortedPosts;
        if (newSortBy === 'Cook Time: Descending') {
            sortedPosts = [...posts].sort((a,b) => b.fields.cookTimeMinutes - a.fields.cookTimeMinutes);
        } else if (newSortBy === 'Cook Time: Ascending') {
            sortedPosts = [...posts].sort((a,b) => a.fields.cookTimeMinutes - b.fields.cookTimeMinutes);
        } else  if (newSortBy === 'Most Recent') {
            sortedPosts = [...posts].sort((a,b) => new Date(b.fields.date) - new Date(a.fields.date));
        } else {
            sortedPosts = [...posts].sort((a,b) => new Date(a.fields.date) - new Date(b.fields.date));
        }

        setPosts(sortedPosts);
    }

    return (
        <div className='recipesMain'>
            <header>
                <h2>Recipes</h2>
                <div className='rightHeader'>
                    {/* <form>
                        <input></input>
                    </form> */}
                    <label>
                        Sort By:
                    <select value={sortBy} onChange={handleSortChange}>
                        <option>Most Recent</option>
                        <option>Oldest</option>
                        <option>Cook Time: Ascending</option>
                        <option>Cook Time: Descending</option>
                    </select>
                    </label>
                </div>
            </header>
            {/* <h1>Recipe Book (work in progress)</h1> */}
            <div className='recipeHolder'>
                {posts.map(post => (
                    <a href={'/' + post.fields.slug} key={post.fields.slug}>
                        <div className='recipeCard'>
                            <div className='imageContainer'> 
                                <img className='image' src={post.fields.image.fields.file.url}></img>
                            </div>
                            <div className='cardBottom'>
                                <h2 style={{fontSize: getFontSize(post.fields.title)}}>{post.fields.title}</h2>
                                <p>🕒{post.fields.cookTime}</p>
                            </div>
                        </div>
                    </a>
                    )
                )}
            </div>
        </div>
    )
}