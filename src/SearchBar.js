import {Link, Route, Router, useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState,useCallback} from "react";
import searchicon from "./images/search.png";
import axios from "axios";


const SearchBar = () => {

	const [search, setSearch] = useState("");
	const [selectOption, setSelectOption] = useState("제목");
	const navigate = useNavigate();

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			console.log("엔터 키를 눌렀습니다.");
			setSearch(e.target.value);
			searchItem(e.target.value);
		}
	};
	const onChange=(e)=>{
		setSearch(e.target.value)
	}

	const onHandleselect=(e)=>{
		setSelectOption(e.target.value);
		console.log(`value = ${e.target.value}`)
	};

	const searchItem = (item)=>{
		console.log("타깃",item)
		setSearch(item);
		const queryParams = `?q=${encodeURIComponent(item)}&select=${encodeURIComponent(selectOption)}`;
		navigate(`/search${queryParams}`);
	}

	return (
		<div className="Home_wrap">
			<div className="select_search">
				<select id="sub" value={selectOption} onChange={onHandleselect}>
					<option value="제목">제목</option>
					<option value="내용">내용</option>
					<option value="작성자">작성자</option>
				</select>
			</div>

			<div className="searchbar">
				<div className="searchinput">
					<input className="input_padding"
						type="text"
						value={search}
						onChange={onChange}
						onKeyDown={handleKeyDown}
						placeholder={"원하는 스터디를 검색해보세요"}
					/>
					<img src ={searchicon} width="20px"/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(SearchBar);
