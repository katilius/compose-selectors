import composeSelectors from '../index';

describe('composeSelectors', () => {
  it('returns a function', () => {
    const mapStateToProps = composeSelectors();
    expect(typeof mapStateToProps).toBe('function');
  });

  it('passes state to selectors from first argument', () => {
    const getTodoCount = state => state.todos.length;
    const getFirstTodo = state => state.todos[0];

    const state = {
      todos: [
        'buy milk',
        'wash a card'
      ]
    };

    const mapStateToProps = composeSelectors({
      todoCount: getTodoCount,
      firstTodo: getFirstTodo
    });

    const result = mapStateToProps(state);

    expect(result).toEqual({
      todoCount: 2,
      firstTodo: 'buy milk'
    });
  });

  it('calls functions from second argument with props (second argument)',
      () => {
        const todoId = props => props.routeParams.todoId;
        const state = {};
        const props = {
          routeParams: {
            todoId: 222
          }
        };
        const mapStateToProps = composeSelectors(undefined, {
          todoId
        });
        const result = mapStateToProps(state, props);

        expect(result).toEqual({
          todoId: 222
        });
      });

  it('combines result from selecting state and props to single object', () => {
    const todoId = props => props.routeParams.todoId;
    const firstTodo = state => state.todos[0];
    const state = {
      todos: [
        'water flowers'
      ]
    };
    const props = {
      routeParams: {
        todoId: 1111
      }
    };
    const mapStateToProps = composeSelectors(
        {
          firstTodo
        },
        {
          todoId
        }
    );
    const result = mapStateToProps(state, props);

    expect(result).toEqual({
      firstTodo: 'water flowers',
      todoId: 1111
    });
  });
});
