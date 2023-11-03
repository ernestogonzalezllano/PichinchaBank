import {renderHook, waitFor} from '@testing-library/react-native';
import {useQuery} from '../../src/hooks/useQuery';

const message = "{message: 'test'}";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve(message),
  }),
) as any;
jest.mock('@react-navigation/native', function () {
  let val = 1;
  return {
    __esModule: true,
    default: jest.fn(),
    useFocusEffect: function (cb: () => void) {
      if (val) {
        cb();
        val--;
      }
    },
  };
});

describe('useQuery', () => {
  test('Should return data', async () => {
    const {result} = await waitFor(() =>
      renderHook(() =>
        useQuery({
          url: '/bp/products',
        }),
      ),
    );
    expect(result.current.data).toEqual(message);
  });
});
