// hooks/hook.ts
import { useState } from 'react';
import { getTodo, addTodo } from '../api/axios'; // 아까 짠 API 함수들

export const useTodo = () => {
    const [todos, setTodos] = useState<Response[]>([]); // 님이 만든 Response 타입 활용!
    const [loading, setLoading] = useState(false);

// 데이터를 가져오는 비동기 함수 선언 (결과를 기다려야 하니 async를 붙임)
    const fetchTodos = async () => {
    // 1. 서버에 요청을 보내기 직전, 로딩 상태를 '참(true)'으로 바꿔서 "일하는 중"임을 표시함
    setLoading(true);

    // 2. 서버에서 할 일 목록을 가져오는 getTodo 함수를 실행하고, 데이터가 다 올 때까지 기다림(await)
    const data = await getTodo();

    // 3. 만약 서버로부터 데이터를 무사히 잘 받아왔다면(data가 존재하면)
    if (data) {
        // 4. 받아온 데이터를 todos 상태 바구니에 저장함 (이때 화면이 자동으로 다시 그려짐)
        setTodos(data);
    }

  // 5. 작업이 다 끝났으니 로딩 상태를 '거짓(false)'으로 바꿔서 로딩 UI를 숨김
    setLoading(false);
    };

    // 데이터를 서버에 전송(추가)하는 비동기 함수 선언 (보낼 내용인 body가 필요함)
    const createTodo = async (body: Request) => {
        // 1. 서버에 새로운 할 일을 등록(addTodo)하고, 작업이 끝날 때까지 기다림
        // (참고: 여기도 setLoading(true)를 넣어주면 전송 중일 때 버튼을 막을 수 있음!)
        const result = await addTodo(body);

    // 2. 만약 서버에 데이터 저장이 성공적으로 완료되었다면
        if (result) {
            // 3. 서버 데이터가 변했으니, 화면에도 최신 데이터를 보여주기 위해 
            // 위에서 만든 fetchTodos 함수를 다시 한 번 실행해서 목록을 새로고침함
            await fetchTodos();
            }
        };

  // 컴포넌트에서 사용할 수 있게 밖으로 내보내기
    return { todos, loading, fetchTodos, createTodo };
};