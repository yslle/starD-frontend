import {Link, Route, Router, useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import searchicon from "./images/search.png";
import axios from "axios";



const SearchBar = (props) => {

	const items = props.searchItems;
	const [search, setSearch] = useState("");
	const [selectOption, setSelectOption] = useState("제목");
	const navigate = useNavigate();
	const [searchState , setSearchState] = useState();


	//엔터를 치면 해당 검색페이지로 넘어갑니다
	const handleKeyDown = (e) => {
		// 엔터 키의 키 코드는 13입니다.
		if (e.keyCode === 13) {
			// 엔터 키를 눌렀을 때 할 작업을 여기에 추가합니다.
			console.log("엔터 키를 눌렀습니다.");
			// 예시: 입력한 내용을 상태에 저장하고 폼을 제출합니다.
			setSearch(e.target.value);
			searchItem(e.target.value);
			// console.log("eee",e.target.value);
			// ... 폼 제출 또는 다른 작업 수행 ...
		}
	};
	const onChange=(e)=>{
		console.log("Search", e.target.value);
		setSearch(e.target.value)

	}

	const onHandleselect = (e)=>{
		setSelectOption(e.target.value);
		console.log(`value = ${e.target.value}`)
	}


	const filterProducts = items.filter((item) => {
		return item.includes(search);
	});

	// TODO 스터디 검색
	useEffect(() => {
		try {
			if (selectOption === "제목") {
				axios.get("http://localhost:8080/api/v2/studies/search-by-title",
					{params: {
							keyword: search}})
					.then((res)=>{
						console.log("전송 성공");
						console.log(res.data);
						setSearchState(res.data);
					}).catch((error)=>{
						console.log('전송 실패', error);
					})
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}, [search, selectOption]);


	//url 동적으로 바꾸기 선택한 옵션과 검색내용이 url안으로 들어갑니다
	const searchItem = (item)=>{
		console.log("타깃",item)
		setSearch(item);
		const queryParams = `?q=${encodeURIComponent(item)}&select=${encodeURIComponent(selectOption)}`;
		navigate(`/search${queryParams}`,{
			 state:searchState
		});
	}

	return (

		<div className="Home_wrap">
			<div className="select_search">
				<select id="sub" value={selectOption} onChange={onHandleselect}>
					<option value="제목">제목</option>
					<option value="내용">내용</option>
					<option value="주제">작성자</option>
				</select>
			</div>

			<div className="searchbar">
				<div className="searchinput">
					<input
						type="text"
						value={search}
						onChange={onChange}
						onKeyDown={handleKeyDown}
						placeholder={"원하는 스터디를 검색해보세요"}
					/>
					<img src ={searchicon} width="20px"/>
				</div>
			{/*	<div className="showfilter">*/}
			{/*		{search !== "" && filterProducts.length === 0 ? (*/}
			{/*			<p>해당 키워드를 가진 스터디가 없습니다.</p>*/}
			{/*		) : null}*/}
			{/*		{search !== "" && filterProducts.length > 0 ? (*/}
			{/*			<ul>*/}
			{/*				{filterProducts.map((item) => {*/}
			{/*					return (*/}
			{/*						<li key={item} onClick={()=>searchItem(item)}>*/}
			{/*							/!*<Link*!/*/}
			{/*							/!*	to={`/${item}`}*!/*/}
			{/*							/!*	style={{*!/*/}
			{/*							/!*		textDecoration: "none",*!/*/}
			{/*							/!*		color: "inherit",*!/*/}
			{/*							/!*	}}*!/*/}
			{/*							/!*	state={{item:item}}*!/*/}
			{/*							/!*>*!/*/}
			{/*							{item}*/}
			{/*							/!*</Link>*!/*/}
			{/*						</li>*/}
			{/*					);*/}
			{/*				})}*/}
			{/*			</ul>*/}
			{/*		) : null}*/}
			{/*	</div>*/}
			</div>
		</div>
	);
};

export default SearchBar;
